import {validationResult} from 'express-validator'
export class CustomerController{
    constructor(customerService){
        this.customerService = customerService;
    }

    _validate(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        return null;
    }

    list = async (req, res, next) =>{
        try{
            res.json(await this.customerService.listCustomers());
        }catch(e){
            next(e);
        }
    }

    get = async (req, res, next) => {
        try{
            if(this._validate(req, res)){
                return;
            }
            const data = await this.customerService.getCustomer(req.params.id);
            if(!data){
                return res.status(404).json({message: 'Not Found'})
            }
            res.status(200).json(data)
        }catch(e){
            next(e);
        }
    }

    create = async (req, res, next) =>{
        try{
            if(this._validate(req, res)){
            return;
        }
        const data = await this.customerService.createCustomer(req.body);
        res.status(201).json(data);
        }catch(e){
            next(e);
        }
    }

    update = async (req, res, next) =>{
        try{
            if(this._validate(req, res)){
            return;
        }

        const data = await this.customerService.updateCustomer(req.params.id, req.body);
        if(!data){
            return res.status(404).json({message: 'No data found'});
        }
        res.status(201).json(data)
        }catch(e){
            next(e);
        }
    }

    delete = async (req, res, next) =>{
        try{
            if(this._validate(req, res)){
                return;
            }

            const ok = await this.customerService.deleteCustomer(req.params.id);
            if(!ok){
                return res.status(404).json('Not found');
            }
            
            res.status(204).send();

        }catch(e){
            next(e);
        }
    }
}