module.exports.getUsers = async (client) => {
    return await client.query(`SELECT u.email, u.lastname, u.firstname, to_char(u.birthday, 'DD-MM-YYYY') as birthday, u.bloc, o.name as optionName, s.id as schoolId, s.name as schoolName
        FROM "user" u
        LEFT JOIN "option" o ON o.name = u.optionName AND o.school = u.optionSchool
        left JOIN school s on o.school = s.id
        GROUP BY u.email, o.name, s.id, s.name`);
    }

module.exports.deleteUser = async (client, id) => {
    return await client.query(`DELETE FROM "user" WHERE email = $1`, [id]);
}

module.exports.userExist = async (client, email) => {
    const results = await client.query(`SELECT email FROM "user" WHERE email=$1`, [email]);
    return results.rows.length > 0;
}

module.exports.editUser = async (client, email, firstName, lastName, schoolId, optionName, bloc) => {
    return await client.query(`UPDATE "user" SET firstName=$1, lastName=$2, bloc=$3, optionName=$4, optionSchool=$5 WHERE email=$6`, [firstName, lastName, bloc, optionName, schoolId, email]);
}


