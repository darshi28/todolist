import instance from '../api/basicconfig';
import reftoken from '../api/loginApi';

const getIdeaList = async () => {
    try{

        const response = await instance.get('/ideas/?page=1');
        console.log("data", response);

        return response.data
    }catch(error){
        console.log(error);
    }
}

const createIdea = async (data) =>{
      try{
        const response = await instance.post('/ideas', data);
        localStorage.setItem('ideaList',JSON.stringify(response.data));
        return response.data
    }catch(error){      
        console.log(error);
    }
}
export default getIdeaList
export {createIdea}