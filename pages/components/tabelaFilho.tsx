import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { AppProps } from 'next/app'
import { useEffect } from 'react';
import { deleteFilho } from '../store/jsonStore';
interface Props {
    pai: string;
}
const TabelaFilho: React.FC<Props> = ({ pai }: Props) => {

    const data = useSelector((state: any) => state.data)
    const dispatch = useDispatch()

    function excluirFilho(pai:any, indexFilho:any) {
        const payload = {pai, indexFilho}
        dispatch(deleteFilho(payload));
        
    }
    return (
        <ul id="results">
            {
                
                data.pessoas.map((pessoa: any, indexPessoas: number) => {
                    switch (pessoa.nome === pai) {
                        case true:
                           
                            switch (pessoa.filhos.length <= 0) {
                                case true:
                                    return (<strong key={indexPessoas}>vazio filho</strong>)
                                case false:
                                    return pessoa.filhos.map((filho: any, indexFilho: number) =>
                                        <li key={indexFilho}>
                                            <span>{filho}</span>
                                            <button onClick={()=>excluirFilho(pessoa.nome, indexFilho)}>Excluir</button>
                                        </li>
                                    )
                            }
                    }
                }

                )
            }
        </ul>

    );
}
export default TabelaFilho