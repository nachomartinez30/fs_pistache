import React from 'react'
import NewInfoProject from '../components/NewInfoProject';

import { BtnVolver } from '../components/BtnVolver';

const NewProject = () => (
    <div className='container'>
        <div className="col-11">
            <br />
            <div className="row justify-content-end">
                <BtnVolver />
            </div>
        </div>

        <NewInfoProject />
        {/* <Footer /> */}
    </div>
)


export default NewProject;