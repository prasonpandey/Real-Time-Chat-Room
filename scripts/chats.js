//Adding new Chat document
//Setting up a real-time listener to get new chats
//updating the username
//updating the room

class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chat = db.collection('chats');
        this.unsub;


    }

    async addChat(message) {
        const now = new Date();

        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }

        const response = await this.chat.add(chat);
        return response;

    }


    getChats(callback) {
        this.unsub = this.chat.where('room', '==', this.room).orderBy('created_at').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    callback(change.doc.data())
                }
            });
        })
    }

    updateName(username){
        this.username = username;
        localStorage.setItem('username',username)
    }

    updateRoom(room){
        this.room = room;
        console.log("room updated");
        if(this.unsub){
            this.unsub();
        }
    }
}




// setTimeout(() => {
//     chatRoom.updateRoom('gaming');
//     chatRoom.updateName("lucky");
//     chatRoom.getChats((data) => {
//         console.log(data);
//     })
//     chatRoom.addChat("Hellooooo")
// }, 3000);