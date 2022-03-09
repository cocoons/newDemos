import { DataTypes } from "sequelize"

export const dbTblAuth = (sequalizeObj) => {
  return sequalizeObj.define('auth', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },  
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    authToken: {
      type: DataTypes.STRING
    },
    authStatus: {
      type: DataTypes.ENUM,
      values: ['true', 'false'],
      defaultValue: 'false'    
    },
    isAdmin: {
      type: DataTypes.ENUM,
      values: ['true', 'false'],
      defaultValue: 'false'    
    },    
    active: {
      type: DataTypes.ENUM,
      values: ['true', 'false'],
      defaultValue: 'true'
    }  
  }, 
  {
    freezeTableName: true
  })
}

export const dbTblPerks = (sequalizeObj) => {
  return sequalizeObj.define('perks', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },     
    icon: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.ENUM,
      values: ['true', 'false'],
      defaultValue: 'true'
    }    
  }, 
  {
    freezeTableName: true
  })
}

export const dbTblEmployees = (sequalizeObj) => {
  return sequalizeObj.define('employees', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },     
    name: {
      type: DataTypes.STRING
    },
    fullName: {
      type: DataTypes.STRING
    },  
    avatar: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    source: {
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.ENUM,
      values: ['true', 'false'],
      defaultValue: 'true'
    }      
  }, 
  {
    freezeTableName: true
  })
}

export const dbTblUserToDos = (sequalizeObj) => {
  return sequalizeObj.define('userToDos', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },     
    userId: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    toDo: {
      type: DataTypes.JSONB
    },
    active: {
      type: DataTypes.ENUM,
      values: ['true', 'false'],
      defaultValue: 'true'
    }    
  }, 
  {
    freezeTableName: true
  })
}

export const dbTblOfferts = (sequalizeObj) => {
  return sequalizeObj.define('offerts', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },        
    companyName: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER
    },    
    offert: {
      type: DataTypes.JSONB
    },
    active: {
      type: DataTypes.ENUM,
      values: ['true', 'false'],
      defaultValue: 'true'
    }   
  }, 
  {
    freezeTableName: true
  })
}
