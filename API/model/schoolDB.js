module.exports.getSchools = async (client) => {
    const results = await client.query(`SELECT * FROM school`);

    return results;
}

module.exports.getOptions = async (client, schoolId) => {
    const results = await client.query(`SELECT O.name, O.nbYears FROM option O WHERE O.school = $1;`, [schoolId]);

    return results;
}

module.exports.deleteSchool = async(client, id) => {
    return await client.query(`DELETE FROM school WHERE id = $1`, [id]);
}

module.exports.deleteOptions = async(client, school) => {
    return await client.query(`DELETE FROM "option" WHERE school = $1`, [school]);
}

module.exports.deleteOption = async(client, name, school) => {
    return await client.query(`DELETE FROM "option" WHERE name = $1 AND school = $2`, [name, school]);
}

module.exports.insertSchool = async(client, name, address, phonenumber) => {
    return await client.query(`INSERT INTO school (name, address, phonenumber) VALUES($1, $2, $3);`, [name, address, phonenumber]);
}

module.exports.editSchool = async(client, schoolid, name, address, phonenumber) => {
    return await client.query(`UPDATE school SET name=$1, address=$2, phonenumber=$3 WHERE id=$4`, [name, address, phonenumber, schoolid]);
}

module.exports.insertOption = async(client, name, nbyears, school) => {
    return await client.query(`INSERT INTO "option" (name, nbYears, school) VALUES($1, $2, $3);`, [name, nbyears, school]);
}

module.exports.editOption = async(client, lastName, schoolId, name, nbYears) => {
    return await client.query(`UPDATE "option" SET name=$1, nbYears=$2 WHERE name=$3 AND school=$4`, [name, nbYears, lastName, schoolId]);
}

module.exports.patchSchoolFromUsers = async(client, schoolID) => {
    return await client.query(`UPDATE "user" SET optionName=NULL, bloc=NULL, optionSchool=NULL WHERE optionSchool=$1`, [schoolID]);
}

module.exports.patchOptionFromUsers = async(client, optionSchool, optionName) => {
    return await client.query(`UPDATE "user" SET optionName=NULL, bloc=NULL, optionSchool=NULL WHERE optionSchool=$1 AND optionName=$2`, [optionSchool, optionName]);
}