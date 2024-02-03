export default {
	methods: {
        deepClone (obj) {
            // Se não for array ou objeto, retorna null
            if (typeof obj !== 'object' || obj === null) {
              return obj;
            }
  
            let cloned, i;
  
            // Handle: Date
            if (obj instanceof Date) {
              cloned = new Date(obj.getTime());
              return cloned;
            }
  
            // Handle: array
            if (obj instanceof Array) {
              let l;
              cloned = [];
              for (i = 0, l = obj.length; i < l; i++) {
                cloned[i] = this.deepClone(obj[i]);
              }
  
              return cloned;
            }
  
            // Handle: object
            cloned = {};
            for (i in obj) if (obj.hasOwnProperty(i)) {
              cloned[i] = this.deepClone(obj[i]);
            }
  
            return cloned;
        },
	}
}