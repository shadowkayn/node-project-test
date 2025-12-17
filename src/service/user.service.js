// 数据处理逻辑集中在这里

const userService = {
    getAll(){
        return [
            { id: 1, name: 'Kayn' },
            { id: 2, name: 'Leo' }
        ]
    },
    getById(id){
        return { id, name: 'User ' + id  }
    },
    getAllList(){
        const users = Array.from({ length: 100 }).map((_, index) => ({
            id: index + 1,
            name: `用户${index + 1}`,
            age: 20 + (index % 10)
        }));
        return users.sort((a, b) => b.age - a.age);
    }
}

module.exports = userService;