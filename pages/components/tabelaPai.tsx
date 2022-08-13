import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import TableFilho from './tabelaFilho'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { deletePai, incluirFilhos } from '../store/jsonStore'

const TabelaPai: NextPage = () => {
     
    const data = useSelector((state: any) => state.data)
    const dispatch = useDispatch()

    function addFilhos(pai:any){
        const filho = prompt(`Adicione um filho`);
        const payload = {pai, filho}
        dispatch(incluirFilhos(payload));

    }
    function excluirPai(pai:any, index:any) {
        const payload = {pai, index}
        dispatch(deletePai(payload));
    }
    useEffect(()=>{
        console.log(data.pessoas)
    },[])

    return (
        <article className={styles.containerTableTabelaResult} id="containerTableTabelaResult">
            {data.pessoas <= 0 ?

                <span>Registro de pessoas vazio</span>
                :
                 data.pessoas.map((pessoas:any, index:number) => {
                    
                    return(
                        <article className={styles.containerTableTabelaResultTable} key={index}>
                            <div className={styles.containerTableTabelaResultTableRow}>
                                <div className={styles.containerTableTabelaResultTableRowPessoa}>{pessoas.nome}</div>
                                <div className={styles.containerTableTabelaResultTableRowButton}>
                                    <button onClick={()=>excluirPai(pessoas.nome, index)}>Excluir</button>
                                </div>
                            </div>
                            <div className={styles.containerTableTabelaResultTableRowData}>
                                <TableFilho pai={ pessoas.nome} />
                            </div>
                            <div className={styles.containerTableTabelaResultTableRowAdd}>
                              
                                <button  onClick={()=>addFilhos(pessoas)}>Adicionar Filho</button>
                            </div>
                        </article>
                    )
                })


            }



        </article>
    );
}
export default TabelaPai