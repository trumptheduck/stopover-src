const Order = require("../models/order.js")
const Coupon = require("../models/coupon.js")

exports.getOrders = async (req, res) => {
    try {
      const orders = await Order.find();
      return res.status(200).json(orders);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

exports.getOrderById = async (req, res) => {
    try {
        const id = req.body._id;
        const order = await Order.findById(id)
        return res.status(200).json(order);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.addOrder = async (req, res) => {
    try {
      var order = null
      console.log(req.body)
      if (req.body.coupon !== null) {
        await Coupon.findOne({code:req.body.coupon},function(err,docs){
          if (err) {
              console.log(err)
          } else {
            if (docs !== null) {
              var total = 0;
              req.body.payload.forEach(item => {
                if (item.item.discount !== null&&item.item.discount !== item.item.price) {
                  total += item.amount*item.item.discount;
                } else {
                  total += item.amount*item.item.price;
                }
              })
              if (req.body.province === "Quảng Ninh") {
                total += 24000;
              } else {
                total += 33000;
              }
              total -= docs.discount;
              order = new Order({
                name: req.body.name,
                phone: req.body.phone,
                province: req.body.province,
                address: req.body.address,
                note: req.body.note,
                coupon: req.body.coupon,
                discount: docs.discount,
                payload: req.body.payload,
                date: req.body.date,
                status: "Chưa kiểm duyệt",
                total: total,
                payment: "COD"
            });
            } else {
              var total = 0;
              req.body.payload.forEach(item => {
                if (item.item.discount !== null&&item.item.discount !== item.item.price) {
                  total += item.amount*item.item.discount;
                } else {
                  total += item.amount*item.item.price;
                }
              })
              if (req.body.province === "Quảng Ninh") {
                total += 24000;
              } else {
                total += 33000;
              }
              order = new Order({
                name: req.body.name,
                phone: req.body.phone,
                province: req.body.province,
                address: req.body.address,
                note: req.body.note,
                payload: req.body.payload,
                date: req.body.date,
                status: "Chưa kiểm duyệt",
                total: total,
                payment: "COD"
              });
            }
          }
        })
      } else {
        var total = 0;
        req.body.payload.forEach(item => {
          if (item.item.discount !== null&&item.item.discount !== item.item.price) {
            total += item.amount*item.item.discount;
          } else {
            total += item.amount*item.item.price;
          }
        })
        if (req.body.province === "Quảng Ninh") {
          total += 24000;
        } else {
          total += 33000;
        }
        order = new Order({
          name: req.body.name,
          phone: req.body.phone,
          province: req.body.province,
          address: req.body.address,
          note: req.body.note,
          payload: req.body.payload,
          date: req.body.date,
          status: "Chưa kiểm duyệt",
          total: total,
          payment: "COD"
        });
      }
      const createdOrder = await order.save();
  
      return res.status(200).json(createdOrder);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

exports.changeOrderStatus = async (req, res) => {
    try {
    let id = req.body._id;
    const order = await Order.findByIdAndUpdate(id,{status: req.body.status})
    return res.status(200).json(req.body.status);
    } catch (err) {
    console.log(err);
    return res.status(500).json(err);
    }
};

exports.removeOrder = async (req, res) => {
    try {
    let id = req.body._id;
    await Order.findByIdAndRemove(id,(err,docs)=>{
      if (err) {
        console.log(err)
      } else {
        console.log(docs)
      }
    })
    return res.status(200).json({ msg: "Xoa order thanh cong" });
    } catch (err) {
    console.log(err);
    return res.status(500).json(err);
    }
};
exports.getAllCoupon = async (req, res) => {
  try {
  const coupons = await Coupon.find()
  return res.status(200).json(coupons);
  } catch (err) {
  console.log(err);
  return res.status(500).json(err);
  }
};
exports.getCoupon = async (req, res) => {
  try {
  const coupon = await Coupon.findOne({code: req.body.code})
  return res.status(200).json(coupon);
  } catch (err) {
  console.log(err);
  return res.status(500).json(err);
  }
};
exports.addCoupon = async (req, res) => {
  try {
  const coupon = new Coupon({
    code: req.body.code,
    discount: req.body.discount
  })
  const savedCoupon = await coupon.save()
  return res.status(200).json(savedCoupon);
  } catch (err) {
  console.log(err);
  return res.status(500).json(err);
  }
};
exports.deleteCoupon = async (req, res) => {
  try {
  let id = req.body._id;
  const coupon = await Coupon.findByIdAndDelete(id,(err,docs)=>{
    if (err) {
      console.log(err)
    } else {
      console.log(docs)
    }
  })
  return res.status(200).json({ msg: "Xoa coupon thanh cong" });
  } catch (err) {
  console.log(err);
  return res.status(500).json(err);
  }
};