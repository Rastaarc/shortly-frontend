import { useEffect } from 'react'


const useMeta = (data) => {
    useEffect(()=>{
        const meta = document.getElementsByTagName('meta')

        data.forEach(item=>{
            const meta_exist = [].find.call(meta, i=> i.name === item.name)
            if(meta_exist){
                document.head.querySelector(`[name=${item.name}]`).setAttribute('content', item.content)
            }else{
                console.log('object')
            }
        })

        //return ()=>
    },[data])
}


export default useMeta