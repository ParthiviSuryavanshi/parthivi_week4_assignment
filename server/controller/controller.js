var Taskdb = require('../model/model');
const { merge } = require('../routes/router');

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Content cannot be empty!" });
    }

    const task = new Taskdb({
        task: req.body.task,
        status: req.body.status,
        date: req.body.date
    });

    task.save()
        .then(data => res.redirect('/add-task'))
        .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the task." }));
};


exports.find=(req,res)=>{
    if(req.query.id){
        const id = req.query.id;
        Taskdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found task with id"+id})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error retrieving task with id"+id})
        })
    }else{
        Taskdb.find()
        .then(task=>{
            res.send(task)
        })
        .catch(err=>{
            res.status(500).send({message:err.message||"Error Occurred while retriving task information"})
        })
    }
}


exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update cannot be empty" });
    }

    const id = req.params.id;
    Taskdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: `Cannot Update task with id ${id}. Maybe task not found!` });
            }
            res.send(data);
        })
        .catch(err => res.status(500).send({ message: "Error updating task information" }));
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Taskdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
            }
            res.send({ message: "Task was deleted successfully!" });
        })
        .catch(err => res.status(500).send({ message: "Could not delete Task with id=" + id }));
};
