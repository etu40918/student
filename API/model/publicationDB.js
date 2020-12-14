module.exports.getPublications = async(client, orderByReports) => {
    return await client.query(`SELECT P.id, P.content, to_char(P.date, 'DD-MM-YYYY') as date, P.user, count(R.publiid) as nbReports
    FROM publication P LEFT JOIN report R ON P.id = R.publiid GROUP BY P.id ORDER BY ${orderByReports ? "nbReports DESC, " : ""}P.id DESC;`);
}

module.exports.getPublicationsFromUser = async(client, email) => {
    return await client.query(`SELECT id FROM publication WHERE "user"=$1;`, [email]);
}

module.exports.deleteLikesFromPublication = async(client, publiID) => {
    return await client.query(`DELETE FROM "like" WHERE publiID = $1`, [publiID]);
}

module.exports.deleteLikesFromUser = async(client, userId) => {
    return await client.query(`DELETE FROM "like" WHERE userId = $1`, [userId]);
}

module.exports.deleteReportsFromPublication = async(client, publiID) => {
    return await client.query(`DELETE FROM report WHERE publiID = $1`, [publiID]);
}

module.exports.deleteReportsFromUser = async(client, userId) => {
    return await client.query(`DELETE FROM report WHERE userId = $1`, [userId]);
}

module.exports.deleteCommentsFromPublication = async(client, publication) => {
    return await client.query(`DELETE FROM comment WHERE publication=$1`, [publication]);
}

module.exports.deleteCommentsFromUser = async(client, user) => {
    return await client.query(`DELETE FROM comment WHERE user=$1`, [user]);
}

module.exports.deletePublication = async(client, id) =>  {
    return await client.query(`DELETE FROM publication WHERE id = $1`, [id]);
}

module.exports.getComments = async(client, publiID) => {
    return await client.query(`SELECT id, content, "user", to_char(date, 'DD-MM-YYYY') as date FROM comment WHERE publication = $1`, [publiID]);
}

module.exports.deleteComment = async (client, id) => {
    return await client.query(`DELETE FROM comment WHERE id = $1`, [id]);
}