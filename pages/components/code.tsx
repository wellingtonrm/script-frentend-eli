import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import styles from '../../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux'

const Code: NextPage = () => {

    const data = useSelector((state:any) => state.data)

  

    return (

        <section>
           
            <pre className={styles.containerCode}>{JSON.stringify(data, null, 2)}</pre>
        </section>

    )
}

export default Code
