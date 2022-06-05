const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()




exports.getsellers = async (req, res) => {
    // const { sellerId, userId, productId } = req.params
    // consol.log(sellerId, userId, productId)
    const data = await prisma.seller.findMany({ include: { products: true } })
    res.send(data)
}

exports.getsellerbyid = async (req, res) => {
    const { id } = req.params
    console.log(id)
    const sellerById = await prisma.seller.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    // console.log(sellerById)
    if (sellerById != null) {
        res.send(sellerById)
    }
    else {
        res.send('Seller is not exist in my database')
    }
}

exports.postseller = async (req, res) => {
    try {
        const { name, email, gstNumber, phoneNumber } = req.body
        const postProduct = await prisma.seller.create(
            {
                data: {
                    name,
                    email,
                    gstNumber,
                    phoneNumber
                }
            }
        )
        res.json(postProduct)
    } catch (err) {
        console.log(err.message)
    }
}

exports.updateseller = async (req, res) => {
    const { id } = await req.params
    const { data } = await req.body
    console.log(data)
    const updateSellerData = await prisma.seller.updateMany({
        where: {
            id: parseInt(id)
        },
        data: data
    })
    res.json(updateSellerData)
}

exports.editseller = async (req, res) => {
    const { id } = req.params
    const updateSellerData = await prisma.seller.update({
        where: {
            id: parseInt(id)
        },
        data: await req.body
    })
    res.send(updateSellerData)
}