const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

// Get all products but using of pagination and also added sortby
exports.products = async (req, res) => {
    const { limit = 10, offset = 0, sortBy, sortOrder, search, position } = req.query
    console.log(`limit : ${limit} & offser : ${offset}, ${search}`)
    const query = {
        // skip: parseInt(offset),         // this will traverse and take us to that position. means i want to reach at 9999 then it will treaverse 9998 after this i will reach to 9999.
        take: parseInt(limit),
        cursor: {     //this will take us at the position without traversing
            id: parseInt(position)
        }
    }
    if (sortBy && sortBy) {
        query['orderBy'] = {
            [sortBy]: sortOrder
        }
    }
    // searching part is not working
    // if (search) {
    //     query['where'] = {
    //         status: 'description',
    //         body: {
    //             search: 'pen'
    //             // description: {
    //             //     search:
    //         }
    //     }
    // }
    const data = await prisma.product.findMany(query)
    res.send(data)
}

exports.productgetbyid = async (req, res) => {
    const { id } = req.params
    const productGetById = await prisma.product.findMany({
        where: {
            id: parseInt(id)
        }
    })
    res.json(productGetById)
}

exports.getproductbysellerid = async (req, res) => {
    const { sellerId } = req.params
    // console.log(sellerId)
    const productGetBySellerId = await prisma.product.findMany({
        where: {
            sellerId: parseInt(sellerId)
        }
    })
    if (productGetBySellerId.length > 0) {
        res.json(productGetBySellerId)
    }
    else {
        res.send(`This id -> ${sellerId} Seller has not any products . `)
    }
}

exports.postproduct = async (req, res) => {
    try {
        const { id } = req.params
        // console.log(req.files)
        const imagesPath = req.files.map((file)=>{
            return file.path
        })
        // console.log(typeof(parseInt(id)))
        const { name, price, description, photos, category } = req.body
        const postProduct = await prisma.product.create(
            {
                data: {
                    name,
                    price:parseInt(price),
                    description,
                    photos:imagesPath,
                    category,
                    sellerId: parseInt(id)
                }
            }
        )
        res.json(postProduct)
    } catch (err) {
        res.send(`this Seller id is not exist. ${err.message} `)
    }
}

exports.updateproduct = async (req, res) => {
    const { id } = await req.params
    const data = req.body
    console.log(id, data)
    const updateProduct = await prisma.product.updateMany({
        where: {
            id: parseInt(id)
        },
        data
    })
    res.json(updateProduct)
}

exports.editproduct = async (req, res) => {
    const { id } = req.params
    const data = req.body
    const updateProductData = await prisma.product.update({
        where: {
            id: parseInt(id)
        },
        data
    })
    res.send(updateProductData)
}

exports.deleteproduct = async (req, res) => {
    const { id } = req.params
    const deleteProduct = await prisma.product.delete({
        where: {
            id: parseInt(id)
        }
    })
    res.send(deleteProduct)
}