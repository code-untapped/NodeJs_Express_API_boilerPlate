import axios from "axios";

export const gseSearchLogic = async(query) => {
    const gseUrl = `https://www.googleapis.com/customsearch/v1?key=${process.env.CSE_API_KEY}&cx=008322231004270391736:l2xisa-12c0&q=${query}&num=10`;

    const shoeObject = {
        shoe: query,
        links: []
    };

    const getRes = await axios.get(gseUrl).then(res => {
        const items = res.data.items;
        return items.map((value) => {
            if (value.hasOwnProperty("pagemap")) {
                if (value.pagemap.metatags[0]["twitter:data1"]) {
                    var price = value.pagemap.metatags[0]["twitter:data1"];

                    if (price.includes(",")) {
                        price = price.replace(",", ".");
                    }

                    if (price.includes(" £")) {
                        price = price.replace(" £", "");
                    }

                    if (value.pagemap.metatags[0]["twitter:image:src"]) {
                        shoeObject.links.push({
                            link: value.pagemap.metatags[0]["og:url"],
                            price: price,
                            image: value.pagemap.metatags[0]["twitter:image:src"]
                        });
                    }

                    if (value.pagemap.metatags[0]["twitter:image"]) {
                        shoeObject.links.push({
                            link: value.pagemap.metatags[0]["og:url"],
                            price: price,
                            image: value.pagemap.metatags[0]["twitter:image"]
                        });
                    }
                }
            }
        });
    });

    return shoeObject
}