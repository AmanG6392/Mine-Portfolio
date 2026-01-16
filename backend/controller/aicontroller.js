import askPortfolioAI from "../configurations/grok.js";


const getResult = async (req, res) => {
    try{

        const{ prompt} = await req.query;
        const result = await askPortfolioAI(prompt);
        res.send(result)

    }catch(error){

     res.status(500).send({message: error.message})

    }
}

export default getResult ;