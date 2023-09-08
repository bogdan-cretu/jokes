import ejs from "ejs";
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
app.use(express.static('public'))
const port = 3000;
const baseURL = "https://v2.jokeapi.dev";
const categories = ["Programming", "Misc", "Pun", "Spooky", "Christmas"];
const params = [
    "idRange=0-100",
];

app.get("/", async (req, res) =>{
    let result = await axios.get(`${baseURL}/joke/${categories.join(",")}?${params.join("&")}`)
    const joke = result.data.joke
    const setup = result.data.setup
    const delivery = result.data.delivery

    res.render("index.ejs", {
        jokeContent : joke,
        jokeSetup : setup,
        jokeDelivery : delivery,
    })   
})

app.listen(port, ()=>{
    console.log(`Port open:  ${port}`);
})