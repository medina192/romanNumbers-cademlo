export class HashTable {
    constructor(size) {
      this.data = new Array(size); //Donde almacenaremos los pares clave/valor
    }
  
    _hash(key) {
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
        hash = (hash + key.charCodeAt(i));
      }
      return hash;
    }
  
    set(key, value) {
      const index = this._hash(key);
      if(!this.data[index])
        {
            this.data[index] = [key, value];
        }
      else // case repeated
      {
          if(Array.isArray(this.data[index][0])) // case [ ['curso1', 'react'], ['curso1', 'node'] ]
          {
              this.data[index].push([key, value])
          }
          else{ // ['curso1', 'react']
              let aux = this.data[index];
              this.data[index] = []
              this.data[index].push(aux);
              this.data[index].push([key, value])
          }
      }
      this.size++
    }
  
    get(key) {
      const index = this._hash(key);
      return this.data[index];
    }
  }


