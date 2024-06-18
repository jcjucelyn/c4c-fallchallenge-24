import React, { useState } from 'react';
import axios from 'axios';

function InputForm() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        thumbnailUrl: '',
        active: false
    });
    
    // update form data on change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type == 'checkbox') {
            setFormData({ ...formData, [name]:checked});
        }
        else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // save form data on submit
    const handleSubmit = async (e) => {

        // prevent form data from reverting
        e.preventDefault();

        try {
            // log the form data
            console.log('data: ', formData);

            // update the partnerdata.json file with new data
            await axios.post('http://localhost:4000/api/save-data', formData);
            console.log('Submission Successful')
        
        // reset form data post submission
        setFormData({name: '', description: '', logoSource: '', active: false})
        } catch (error) {
            console.error('Submission failed, error: ', error);
        }
    };

    return (
        <div>
            <h3>New Partner Submission</h3>
            <div id='form'>
            <form onSubmit={handleSubmit}>
                <label>
                    Partner Name:
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Brief Description:
                    <input
                        type='text'
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        // rows='3'
                        required
                    />
                </label>
                <label>
                    Logo URL:
                    <input
                        type='text'
                        name='thumbnailUrl'
                        value={formData.thumbnailUrl}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Active Partner?
                    <input
                        type='checkbox'
                        name='active'
                        onChange={handleChange}
                        checked={formData.active}
                        
                    />
                </label>
                <br/>
                <button type="submit">Submit Partner</button>
            </form>
            </div>
        </div>
    );

}

export default InputForm;