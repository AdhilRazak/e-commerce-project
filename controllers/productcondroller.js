const CategoryModel = require('../model/categorycollection'); // Renamed to follow naming convention
const ProductModel = require('../model/productcollection');

module.exports = {
    productget: async (req, res) => {
        try {
            const productdat = await ProductModel.find({});
            res.render('admin/product', { productdat });
        } catch (error) {
            console.error('Error in fetching product data:', error);
            res.status(500).json({ message: 'Error in fetching product data' });
        }
    },

    addproductget: async (req, res) => {
        try {
            const categorydata = await CategoryModel.find({});
            res.render('admin/addproduct', { categorydata });
        } catch (error) {
            console.error('Error in fetching category data:', error);
            res.status(500).json({ message: 'Error in fetching category data' });
        }
    },

    addproductspost: async (req, res) => {
        try {

            if (!req.files || req.files.length > 5) {
                return res.status(400).json({ message: "Please provide up to 5 images", success: false });
            }

            const productImages = req.files.map(file => file.filename);

            const { productName, prices, discount, stock, category, subCategory, deliveryDate, description, color, size } = req.body;

            // Ensure consistent naming convention (ProductModel instead of productModel)
            const newProduct = new ProductModel({
                productName,
                prices,
                discount,
                stock,
                category,
                subCategory,
                deliveryDate,
                description,
                size,
                color,
                productImage: productImages,
            });

            await newProduct.save();

            // Redirect to the appropriate route after successful product addition
            res.redirect('/admin/product');
        } catch (error) {
            console.error("Error saving data to the database:", error);
            // Differentiate between server errors and client errors
            res.status(500).json({ message: "Internal Server Error", success: false });
        }
    },

    blockproductvisility: async (req, res) => {
        try {
            const proID = req.query.id;
            const product = await ProductModel.findOne({ _id: proID });
    
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
    
            let state;
    
            if (product.status) {
                await ProductModel.updateOne({ _id: proID }, { $set: { status: false } });
                state =false;
            } else {
                await ProductModel.updateOne({ _id: proID }, { $set: { status: true } });
                state =true;
            }
    
            res.json({state});
        } catch (error) {
            console.error("Error in blocking/unblocking product:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    
};
