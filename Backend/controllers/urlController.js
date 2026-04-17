const Url = require("../models/Url")
const QrCode = require("qrcode")
const generateShortId = require("../utils/generateShortId")
exports.createUrl = async (req,res)=>{
    try{
        const {originalUrl,customId,expiresIn} = req.body

        if(!originalUrl){
            return res.status(400).json({error: "Original URL is required"})
         
        }


        const shortId = customId || generateShortId()
        const exists = await Url.findOne({shortId})
        if(exists){
            return res.status(400).json({error: "Short ID already exists"})
        }
        let expiresAt = null
        if(expiresIn){
            expiresAt = new Date(Date.now() + expiresIn * 1000)
        }

        const newUrl = await Url.create({
            originalUrl,
            shortId,
            expiresAt
        })
        const qrCode = await QrCode.toDataURL(`http://localhost:${process.env.PORT || 3000}/${shortId}`)
        console.log(qrCode)
        res.json({
            shortUrl:  `http://localhost:${process.env.PORT || 3000}/${shortId}`,
            expiresAt,
            qrCode
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

exports.redirectUrl = async (req, res) => {
    try {
        const { shortId } = req.params

        const url = await Url.findOne({ shortId })

        if (!url) {
            return res.status(404).send("Not found")
        }

        
        if (url.expiresAt && url.expiresAt < new Date()) {
            return res.status(410).send("Link expired")
        }

        res.redirect(url.originalUrl)

    } catch (err) {
        res.status(500).send("Error")
    }
}