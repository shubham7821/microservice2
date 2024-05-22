const express = require('express')
const cors = require('cors')
require("dotenv").config()
require('./config/init_mongodb')
const { Client, logger } = require("camunda-external-task-client-js");
const app = express()
const nodemailer = require("nodemailer");

const config = {
    baseUrl: "http://13.235.39.142:8080/engine-rest",
    use: logger,
    asyncResponseTimeout: 10000
};
const client = new Client(config);

var employee = require('./models/employeeModel');
const DepartmentsSchema = require('./models/departmentModel');
const mongoose = require('mongoose');
const tenantConnections = {};

function connectToTenantDB(tenantId) {
    const uri = `mongodb+srv://limsLive:aaBWYuQsa92ycD6S@cluster0.rxbiy14.mongodb.net/${tenantId}?retryWrites=true&w=majority`;
    const connection = mongoose.createConnection(uri);
    tenantConnections[tenantId] = connection;
    return connection;
}

client.subscribe("delete-department", async function ({ task, taskService }) {
    console.log("delete-department");
    // Put your business logic
    const tenantId = task.variables.get('bu_login_id');
    const _id = task.variables.get('_id');
    const tenantConnection = await connectToTenantDB("bu_" + tenantId);
    const departmentModel = tenantConnection.model('departments', DepartmentsSchema);
    const deleteDepartment = await departmentModel.deleteOne({ _id: _id }).exec();
    // complete the task
    console.log("deleteDepartment", deleteDepartment)
    await taskService.complete(task);
});

client.subscribe("registration-completed", async function ({ task, taskService }) {
    console.log("registration-completed");
    // Put your business logic
    const employee_id = task.variables.get('employee_id');

    //update employee approval status
    employee.findByIdAndUpdate(employee_id, {
        status: "Completed"
    }).then((res) => {
        console.log("Update Approve Status Successfully", res);
    }).catch(err => {
        console.log(err);
    })

    // complete the task
    await taskService.complete(task);
});

client.subscribe("genarate-report", async function ({ task, taskService }) {
    console.log("genarate-report");
    // Put your business logic
    const employee_id = task.variables.get('employee_id');

    // complete the task
    await taskService.complete(task);
});

client.subscribe("send-report-mail", async function ({ task, taskService }) {
    console.log("send-report-mail");
    // Put your business logic

    const employee_id = task.variables.get('employee_id');

    const employeInfo = await employee.findById(employee_id);

    console.log('employee_id', employee_id);
    console.log('employeInfo', employeInfo);

    if (employeInfo) {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "shubham@onebillionideas.io",
                pass: "prue oirp xvyi kyva",
            },
        });

        let emp_name = employeInfo.data.name;

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'awstechaudit@gmail.com', // sender address
            to: employeInfo.data.email, // list of receivers
            subject: "Registration Approved", // Subject line
            text: emp_name + " Registration Approved Successfully", // plain text body
            html: "<b>" + emp_name + "Registration Approved Successfully</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        console.log('email sent successfully');
    }

    // complete the task
    await taskService.complete(task);
});

client.subscribe("registration-rejected", async function ({ task, taskService }) {
    console.log("registration-rejected");
    // Put your business logic
    const employee_id = task.variables.get('employee_id');

    //update employee approval status
    employee.findByIdAndUpdate(employee_id, {
        status: "Rejected"
    }).then((res) => {
        console.log("Update Reject Status Successfully", res);
    }).catch(err => {
        console.log(err);
    })

    // complete the task
    await taskService.complete(task);
});

client.subscribe("registration-with-comment", async function ({ task, taskService }) {
    console.log("registration-with-comment");

    // Put your business logic
    const employee_id = task.variables.get('employee_id');
    const systemComment = task.variables.get('systemComment');

    //update employee approval status
    employee.findByIdAndUpdate(employee_id, {
        status: "Comment",
        comment: systemComment
    }).then((res) => {
        console.log("Update RWC Status Successfully", res);
    }).catch(err => {
        console.log(err);
    })
    console.log('systemComment', systemComment);

    // complete the task
    await taskService.complete(task);
});

var corOptions = {
    origin: 'http://localhost:3000'
}

/*** Global Middleware ***/
app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


/*** Testing Api ***/
app.get('/', async (req, res) => {
    res.json({
        msg: 'This is first api route'
    })
})

/*** Port ***/
const PORT = process.env.PORT || 3001

/** Server */
app.listen(PORT, async () => {
    console.log(`server is running on port ${PORT}`);
})