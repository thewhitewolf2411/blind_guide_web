import mongoose from "mongoose";
import bcrypt from "bcrypt";

import User from "../../models/User";

const seedDB = async () => {

    const user = await User.findOne({email: 'amnadz@gmail.com'});

    if(!user){
        const hashedPassword = await bcrypt.hash('4y2wSZnHH8oG0gqHg3fq', 12);

        const seedUsers = [
            {
                name: 'Amna Džiho',
                email: 'amnadz@gmail.com',
                password: hashedPassword
            }
        ];
    
        await User.deleteMany({});
        await User.insertMany(seedUsers);

        console.log("User inserted");
    }
}

export default seedDB;