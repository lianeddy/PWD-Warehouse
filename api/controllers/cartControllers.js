const {
  cart,
  user,
  product,
  productImage,
  warehouse,
  inventory,
  category,
} = require("../models");

const getCartById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getData = await cart.findAll({
      where: {
        user_id: id,
      },
      include: [
        {
          model: product,
          include: [{ model: productImage }, { model: category }],
          required: true,
        },
      ],
    });

    const response = getData.map((val, i) => {
      return {
        name: val.product.name,
        price: val.product.price,
        category: val.product.category.category,
        description: val.product.description,
        qty: val.qty,
        imagepath: val.product.product_images[0].imagepath,
      };
    });

    res.status(200).send(response);
  } catch (err) {
    console.log(err);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const addCart = await cart.create({
      qty: req.body.qty,
      product_id: req.params.id,
      user_id: req.body.user_id,
    });
    res.status(200).send({ message: "Add to Cart Success", id: addCart.id });
  } catch (err) {
    next(err);
  }
};

const editQtyCart = async (req, res, next) => {
  try {
    const qty = await cart.update(
      {
        qty: req.body.qty,
      },
      {
        where: {
          user_id: req.params.id,
        },
      }
    );
    res.status(200).send({ message: "Updated", id: qty.id });
  } catch (err) {
    next(err);
  }
};

module.exports = { addToCart, editQtyCart, getCartById };
