import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import TabelaPai from './components/tabelaPai'
import Code from './components/code'
import { useSelector, useDispatch } from 'react-redux'
import {  gets, incluir, posts, datas} from './store/jsonStore'
import { RootState, useAppDispatch } from './store/store'
const Home: NextPage = () => {
   
    const data = useSelector((state:RootState) => state.data)
    const dispatch = useAppDispatch()
    const [isPai, setIsPai] = useState("")
    
    function include(){
        if(isPai.length < 3){
            alert("Digite um nome válido")
        }else{
          dispatch(incluir(isPai))
        }
        
    }
    function gravar(){
        
        dispatch(posts())
    }
    async function ler(){
        const data = await dispatch(gets())
        const {payload} = data
        console.log(payload)
        dispatch(datas(payload.pessoas))
    }
 

useEffect(()=>{
},[]);
    return (
        <main className={styles.main}>
            <section>
                <article className={styles.controleDB}>
                    <span>Action DB</span>
                    <article className={styles.controleDBButtom}>
                        <button onClick={gravar} className={styles.controleDBButtomGravar}>Gravar</button>
                        <button onClick={ler} className={styles.controleDBButtomLer}>Ler</button>
                    </article>
                </article>
                <article className={styles.containeradd}>
                    <label>Nome:</label>
                    <input 
                    type="text" 
                    placeholder="Digite o nome da pessoa" 
                    onChange={(event) => setIsPai(event.target.value)}
                    value={isPai} 
                    />
                    <button onClick={include}>Incluir</button>
                </article>

                <article className={styles.containerTable}>
                    <article className={styles.containerTableTitle}>
                        <span>Pessoas</span>
                    </article>
                    <TabelaPai />
                </article>
            </section >
           <Code/>
        </main>
    )
}

export default Home
