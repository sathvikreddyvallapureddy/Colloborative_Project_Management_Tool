import Task from "../models/Task.js";
// import User from "../models/User.js";

export const createTask = async (req, res) => {
  try {
    const { userId } = req.user;

    const { title, team, stage, date, priority } = req.body;

    // let text = "New task has been assigned to you";
    // if (team?.length > 1) {
    //   text = text + ` and ${team?.length - 1} others.`;
    // }

    // text =
    //   text +
    //   ` The task priority is set a ${priority} priority, so check and act accordingly. The task date is ${new Date(
    //     date
    //   ).toDateString()}. Thank you!!!`;

    // const activity = {
    //   type: "assigned",
    //   activity: text,
    //   by: userId,
    // };

    const task = await Task.create({
      title,
      team,
      stage: stage.toLowerCase(),
      date,
      priority: priority.toLowerCase(),
    });

    // await Notice.create({
    //   team,
    //   text,
    //   task: task._id,
    // });

    res
      .status(200)
      .json({ status: true, task, message: "Task created successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { stage } = req.query;

    let query = {};

    if (stage) {
      query.stage = stage;
    }

    let queryResult = Task.find(query).populate({
      path: "team",
      select: "name title email",
    });

    const tasks = await queryResult;
    res.status(200).json({
      status: true,
      tasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, team, stage, priority, assets } = req.body;

    const task = await Task.findById(id);

    task.title = title;
    task.date = date;
    task.priority = priority.toLowerCase();
    task.stage = stage.toLowerCase();
    task.team = team;

    await task.save();

    res
      .status(200)
      .json({ status: true, message: "Task updated successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await Task.findByIdAndDelete(id);

    res
      .status(200)
      .json({ status: true, message: "Task deleted successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};
