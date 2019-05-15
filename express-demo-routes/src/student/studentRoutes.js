const Joi = require('@hapi/joi');
const express = require('express');
const app = express();
app.use(express.json());

let students = [
    { id: 1, name: "shamim" },
    { id: 2, name: "John" }
]


app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get("/student/:id", (req, res) => {
    res.send(req.params.id);
});

app.get("/student/:id/:name", (req, res) => {
    res.send(req.params);
});

app.get("/student", (req, res) => {
    res.send(req.query);
});

app.post("/student", (req, res) => {
    console.log(req.body.name)
    res.send(req.body);
});

app.post("/student-object", (req, res) => {

    // if (!req.body.name || req.body.name.length < 3) {
    //     res.send('Name is required and should be minimum 3 characters.');
    //     return;
    // }


    const result = validateStudent(req.body);

    // console.log(result);

    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }


    const student = req.body;
    student.id = students.length + 1;
    /* const student = {
        id: students.length + 1,
        name: req.body.name
    } */
    res.send(student);
});

app.put("/student/:id", (req, res) => {

    const student = students.find(s => s.id === parseInt(req.params.id));

    if (!student) {
        res.status(404).send(`The student with the given Id was not exist!`)
    }

    const result = validateStudent(req.body);

    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    res.send(req.body);
});

app.delete("/student/:id", (req, res) => {

    const student = students.find(s => s.id === parseInt(req.params.id));

    if (!student) {
        res.status(404).send(`The student with the given Id was not exist!`)
    }

    res.send("Success fully deleted!");
});


function validateStudent(student) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
        dept: Joi.required()
    });

    return Joi.validate(student, schema);
}

module.exports = app;