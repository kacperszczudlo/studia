import { IData, Query } from "../models/data.model";
// POPRAWIONO ŚCIEŻKĘ: zmieniono '../../schemas/data.schema' na '../schemas/data.schema'
import PostModel from '../../schemas/data.schema'; 

class DataService { 
    
    // CREATE (Zadanie 6)
    public async createPost(postParams: IData) {
        try {
            const dataModel = new PostModel(postParams);
            await dataModel.save();
            console.log("UTWORZONE ID DO TESTÓW:", dataModel._id);
        } catch (error) {
            console.error('Wystąpił błąd podczas tworzenia danych:', error);
            throw new Error('Wystąpił błąd podczas tworzenia danych');
        }
    }

    // READ (QUERY - Zadanie 6)
    public async query(query: Query<number | string | boolean>) {
        try {
            const result = await PostModel.find(query, {
                __v: 0, 
                // Zgodnie z lab. pomijamy wersję. Pole _id: 0 zostało usunięte w późniejszej weryfikacji,
                // aby umożliwić testowanie getById/deleteById. Wracamy do ścisłej wersji:
                _id: 0 
            });
            return result;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }
    
    // READ by ID (getById - Zadanie 7)
    public async getById(id: string) {
        try {
            // POPRAWIONO: Usunięto projekcję { __v: 0, _id: 0 } z findById, 
            // aby zwrócić kompletny dokument, w tym _id.
            const result = await PostModel.findById(id); 
            return result;
        } catch (error) {
            throw new Error(`Get by ID failed: ${error}`);
        }
    }

    // DELETE by Query (deleteData - Zadanie 6)
    public async deleteData(query: Query<number | string | boolean>) { 
        try {
            await PostModel.deleteMany(query);
        } catch (error) {
            console.error('Wystąpił błąd podczas usuwania danych:', error);
            throw new Error('Wystąpił błąd podczas usuwania danych');
        }
    }

    // DELETE by ID (deleteById - Zadanie 7)
    public async deleteById(id: string) {
        try {
            await PostModel.findByIdAndDelete(id); 
        } catch (error) {
            console.error('Wystąpił błąd podczas usuwania danych po ID:', error);
            throw new Error('Wystąpił błąd podczas usuwania danych po ID');
        }
    }

    // DELETE All (deleteAllPosts - Zadanie 7)
    public async deleteAllPosts() {
        try {
            await PostModel.deleteMany({});
        } catch (error) {
            console.error('Wystąpił błąd podczas usuwania wszystkich danych:', error);
            throw new Error('Wystąpił błąd podczas usuwania wszystkich danych');
        }
    }
}

export default DataService;