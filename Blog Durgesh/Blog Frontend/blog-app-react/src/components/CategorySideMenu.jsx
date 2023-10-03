import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../servicesArea/CategoryService'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function CategorySideMenu() {

    const [categories, setCategories] = useState([])
    useEffect(() => {
        loadAllCategories().then(data => {
            setCategories([...data])
            console.log("loading categories")
            console.log(data)
        }).catch(error => {
            console.log(error)
            toast.error("error in loading categories")
        })
    },[])

    return (
        <div>
            <ListGroup>
                <ListGroupItem tag={Link} to="/" action={true} className='border-0'>
                    All blogs
                </ListGroupItem>

                {categories && categories.map((cat,index)=>{
                    return(
                        <ListGroupItem tag={Link} to={'/categories/'+cat.id} className='border-0 shadow-0 mt-1' action={true} key={index}>
                            {cat.categoryTitle}
                        </ListGroupItem>
                    )
                })}


            </ListGroup>
        </div>
    )
}

export default CategorySideMenu