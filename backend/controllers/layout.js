const Layout = require("../models/layout.js");

exports.getLayout = async (req, res) => {
    try {
    const layout = await Layout.findOne({})
    .populate({
        path: "homepage",
        populate:{
            path: "children",
            populate : 
            {
                path: "item",
            }
        }
    })
    .populate({
        path: "all",
        populate:{
            path: "children",
            populate : 
            {
                path: "item",
            }
        }
    })
    .populate({
        path: "flashsale",
        populate:{
            path: "children",
            populate : 
            {
                path: "item",
            }
        }
    })
    .populate({
        path: "weekly",
        populate:{
            path: "children",
            populate : 
            {
                path: "item",
            }
        }
    })
    return res.status(200).json(layout);
    } catch (err) {
    console.log(err);
    return res.status(500).json(err);
    }
};

exports.updateLayout = async (req, res) => {
    try {
    const layout = await Layout.findOneAndUpdate({},req.body)
    return res.status(200).json(layout);
    } catch (err) {
    console.log(err);
    return res.status(500).json(err);
    }
};

exports.createLayout = async (req, res) => {
    try {
        var layout = {
            msg: "Existed"
        }
        Layout.countDocuments({}, function (err, count) {
            if (count === 0) {
                layout = new Layout({
                    homepage: [],
                    all: [],
                })
            }
            layout.save();
        });
    return res.status(200).json(layout);
    } catch (err) {
    console.log(err);
    return res.status(500).json(err);
    }
};