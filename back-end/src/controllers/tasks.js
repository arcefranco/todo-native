import {connect} from '../database'


export const getTasks = async (req, res) => {   
 const db = await connect() 
const [rows] = await db.query("SELECT * FROM tasks")
res.send(rows)
}
export const getTask = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query("SELECT * FROM TASKS WHERE id = ?", [req.params.id])
    res.json(rows[0])
}   
export const getTaskCount = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query("SELECT COUNT (*) FROM tasks")
    res.json(rows[0]["COUNT(*)"])
}

export const createTask = async (req, res) => {
    const {title, description} = req.body
    const db = await connect();
    const [rows] = await db.query("INSERT INTO tasks(title, description) values(?,?)",[
        title,
        description
    ])
 
    res.json({
        id: rows.insertId,
        ...req.body
    })
}
export const updateTask = async (req, res) => {
    const {id} = req.params
    try {
    const db = await connect();
   const rows = await db.query("UPDATE tasks SET ? WHERE id = ?",[req.body, id])
   console.log(rows)
    res.json(`task ${id} updated succesfully!`)
    } catch (error) {
        console.log(error)
        res.send(error) 
    }
    
}
export const deleteTask = async (req, res) => {
    const {id} = req.params
    try {
    const db = await connect();
   const rows = await db.query("DELETE FROM  TASKS WHERE id = ?", [id])
   console.log(rows)
    res.json(`task ${id} deleted succesfully!`)
    } catch (error) {
        console.log(error)
        res.send(error) 
    }

}