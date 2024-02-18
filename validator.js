export const validateData = (data)=>{

    if(isNaN(data.id)){
        return {success:false, message:"Invalid or missing field for id", code:400};
    }
    if(data.id <= 0){
        return {success:false, message:"missing field for id", code:400};
    }
    
    if (typeof data.name !== 'string'){
        return {success:false, message:"Invalid type for name", code:400};
    }

    if (data.name.length === 0){
        return {success:false, message:"Missing name field.", code:400};
    }

    if (typeof data.age !== 'number'){
        return {success:false, message:"Invalid type for age ", code:400};
    }

    
    if (data.age <=  0){
        return {success:false, message:"Invalid type for age", code:400};
    }

    if(isNaN(data.age)){
        return {success:false, message:"Invalid or missing field for age", code:400};
    }

    return {success:true};

};



