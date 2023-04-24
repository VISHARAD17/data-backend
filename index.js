import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4001;
const uri = "mongodb+srv://visharad:0Bnk5uamhybQQUap@cluster0.p5d50.mongodb.net/node_data?retryWrites=true&w=majority";


// const dataSchema = new mongoose.Schema({
//     name: String
// })

const dataSchema = new mongoose.Schema({
    id: Number,
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    income: String,
    city: String,
    car: String,
    quote: String,
    phone_price: String
})

// schema.set('collection', 'sample_data');

const Data = new mongoose.model('Data', dataSchema, 'data');

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then(
    () => {console.log("database connected !")},
    (err) => {console.log(err)}
);

app.get('/', (req, res)=>{
    res.send("Server running");
});

app.get('/getAll', (req, res) => {
    Data.find({}).then((data_list) => {
        // console.log(data_list);
        res.send(data_list);
    }).catch((err) => {
        console.log(err);
    });
})


app.get('/getcond1', (req, res) => {
    Data.find({}).then((data_list) => {
        const allData = data_list;
        const userCar = [];
        allData.forEach( (ele) => {
            if((ele.car == "BMW" || ele.car === "Mercedes" || ele.car === "Mercedes-Benz") && Number(ele.income.slice(1)) < 5.00){
                userCar.push(ele);
            }
        })
        res.send(userCar);

    }).catch((err) => {
        console.log(err);
    })
});

app.get('/getcond2', (req, res) => {
    Data.find({}).then((data_list) => {
        const allData = data_list;
        const users = [];
        allData.forEach( (ele) => {
            if(Number(ele.phone_price) > 10000 && ele.gender === "Male") users.push(ele);
        });
        res.send(users);

    }).catch((err) => {
        console.log(err);
    })
});

const cond3_fn = (user) => {
    const last_name_length = user.last_name.length;
    const quote_length = user.quote.length;
    const email = user.email;

    const includesName = email.includes(user.last_name) ? true: false;

    if(user.last_name.charAt(last_name_length - 1) == 'M' && quote_length > 15 && includesName == true){
        return true
    }
}

app.get('/getcond3', (req, res) => {
    Data.find({}).then((data_list) => {
        const allData = data_list;
        const users = [];
        allData.forEach( (ele) => {
            const last_name_length = ele.last_name.length;
            const quote_length = ele.quote.length;
            const email = ele.email;

            const includesName = email.includes(ele.last_name) ? true: false;

            if(ele.last_name.charAt(last_name_length - 1) == 'M' && quote_length > 15 && includesName == true){
                users.push(ele);
            }
        });
        res.send(users);

    }).catch((err) => {
        console.log(err);
    })
});


app.get('/getcond4', (req, res) => {
    Data.find({}).then((data_list) => {
        const allData = data_list;
        const users = [];
        allData.forEach( (ele) => {
            if((ele.car == "BMW" || ele.car === "Mercedes" || ele.car === "Mercedes-Benz" || 
            ele.car == "Audi") && /\d/.test(ele.email) == true) users.push(ele)
        });
        res.send(users);

    }).catch((err) => {
        console.log(err);
    })
});
app.listen(PORT, (req, res) => {
    console.log("backend connected on port "+ PORT);
});