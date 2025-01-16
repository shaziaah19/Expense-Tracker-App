const UserModel = require("../Models/User");

const addExpenses = async (req, res) => {
  const body = req.body;
  const { _id } = req.user;
  try {
    const userData = await UserModel.findByIdAndUpdate(
      _id, //user id
      {
        $push: {
          expenses: body,
        },
      },
      { new: true } //for returning the updated document
    );
    return res.status(200).json({
      message: "expense added succesfully",
      success: true,
      data: userData?.expenses,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      success: false,
    });
  }
};
const showExpenses = async (req, res) => {
  const body = req.body;
  const { _id } = req.user;
  try {
    const userData = await UserModel.findById(_id).select('expenses'); 
    return res.status(200).json({
      message: "fetched expenses succesfully",
      success: true,
      data: userData?.expenses,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      success: false,
    });
  }
};

const removeExpenses = async (req, res) => {
 
    const { _id } = req.user;
    const {expenseId}=req.params
    try {
      const userData = await UserModel.findByIdAndUpdate(
        _id, //user id
        {
          $pull : {
            expenses: {_id:expenseId},
          },
        },
        { new: true } //for returning the updated document
      );
      return res.status(200).json({
        message: "expense deleted succesfully",
        success: true,
        data: userData?.expenses,
      });
    } catch (error) {
      return res.status(500).json({
        message: "something went wrong",
        success: false,
      });
    }
  
};

module.exports = { showExpenses, removeExpenses, addExpenses };
