import express from 'express'
import tutoresRoutes from './routes/tutores'
import veterinariosRoutes from './routes/veterinarios'
import petsRoutes from './routes/pets'
import consultasRoutes from './routes/consultas'
import prontuariosRoutes from './routes/prontuarios'
import racasRoutes from './routes/racas'
import especiesRoutes from './routes/especies'
import dashboardRoutes from './routes/dashboard'
import cors from 'cors'


const app = express()
const port = 3004


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/tutores", tutoresRoutes)
app.use("/veterinarios", veterinariosRoutes)
app.use("/pets", petsRoutes)
app.use("/consultas", consultasRoutes)
app.use("/prontuarios", prontuariosRoutes)
app.use("/racas", racasRoutes)
app.use("/especies", especiesRoutes)
app.use("/dashboard", dashboardRoutes)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

