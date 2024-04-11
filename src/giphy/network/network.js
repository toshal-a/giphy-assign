// const apiKey = "xoovBeSfYroxX3WQEVb6HzrZoMODLl9b";
const apiKey = "9eERomQJiPSTqg4ndnFBF5RbB8dHeYkn";

export const fetchProducts = async (limit, skip) => {

    const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}&offset=${skip}&rating=g&bundle=low_bandwidth`);
    const data = await response.json();

    return data;
}

export const fetchSearchResults = async (limit, skip, query) => {
    console.log("query", query);
    const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${limit}&offset=${skip}&rating=g&lang=en&bundle=low_bandwidth`
    )

    const data = await response.json();

    return data;
}