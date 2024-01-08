import instance from '../api/basicconfig';

const getIdeaList = async () => {
    try {

        const response = await instance.get('/ideas/?page=1');
        console.log("data", response);

        return response.data
    } catch (error) {
        console.log(error);
    }
}

const createIdea = async (data) => {
    try {
        const response = await instance.post('/ideas', data);
        localStorage.setItem('ideaList', JSON.stringify(response.data));
        return response.data
    } catch (error) {
        console.log(error);
    }
}

const deleteIdea = async (id) => {
    try {
        const response = await instance.delete(`/ideas/${id}/`);
        console.log("delete response", response);

        return "Record Deleted Successfully !"

    } catch (error) {
        console.log(error);
    }
}

const updateIdea = async ( data) => {
    try {
        const response = await instance.put(`/ideas/${data.id}/`, data);
        console.log("Update response", response);

        return "Record Updated Successfully !"
    } catch (error) {
        console.log(error);
    }
}
export default { getIdeaList, createIdea, deleteIdea, updateIdea}