const pool = require('../dbCom')

class TodoRepo{
    async getAllTask(){
        return await pool.query('select * from public.todoList');
    }

    async createtaskRepo(task,done){
        return await pool.query(`INSERT INTO public.todolist
    (task, done)
    VALUES($1, $2)`,
    [task,done]

    )
    }
    
    async filtertaskRepo(){
        return await pool.query(`SELECT id, task, done
        FROM public.todolist
        WHERE done='true';`

    )
    }

    
    async counttaskRepo(task,done){
        return await pool.query(`select count(*) as total,
        count(done) filter (where done = 'true') as Done,
        count(done) filter (where done = 'false') as Pending
        from public.todolist ;`

    )
    }

    async updatetaskRepo(id,task){
        return await pool.query(`UPDATE public.todolist
        SET  task=$2
        WHERE id=$1 ;`,
        [id,task]
         
      )
    }
    
    async updatestatusRepo(id,done){
        return await pool.query(`UPDATE public.todolist
        SET  done=$2
        WHERE id=$1; `,
        [id,done]
         
      )
    }

    
    async deletetaskRepo(id){
        return await pool.query(`DELETE FROM public.todolist
        WHERE id=$1; `,
        [id]
         
      )
    }
    
    

} 

module.exports = TodoRepo;