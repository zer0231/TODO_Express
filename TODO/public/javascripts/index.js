const draggables = document.querySelectorAll('#draggable_item')
const dropable_place = document.querySelectorAll('#dropable_place')


draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        // console.log("Drag start")
        draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
        // console.log("Drag End")
        var i

        draggable.classList.remove('dragging')

        var new_card_value = []
        var all_todo_children = document.querySelectorAll('.todo_card #dropable_place #draggable_item')
        console.log(all_todo_children.length)
        for (i = 0; i < all_todo_children.length; i++) {

            var id = all_todo_children[i].getAttribute('data-value')
            new_card_value.push({
                'id': id,
                'status': 'todo'
            })
        }

        var all_inprogress_children = document.querySelectorAll('.inprogress_card #dropable_place #draggable_item')
        for (i = 0; i < all_inprogress_children.length; i++) {
            var id = all_inprogress_children[i].getAttribute('data-value')
            new_card_value.push({
                'id': id,
                'status': 'inprogress'
            })
            // console.log(all_inprogress_children[i].getAttribute('value'))
        }

        var all_testing_children = document.querySelectorAll('.testing_card #dropable_place #draggable_item')
        for (i = 0; i < all_testing_children.length; i++) {
            var id = all_testing_children[i].getAttribute('data-value')
            new_card_value.push({
                'id': id,
                'status': 'testing'
            })
        }

        var all_done_children = document.querySelectorAll('.done_card #dropable_place #draggable_item')
        for (i = 0; i < all_done_children.length; i++) {
            var id = all_done_children[i].getAttribute('data-value')
            new_card_value.push({
                'id': id,
                'status': 'done'
            })
        }

        fetch('/update-cards', {
                method: 'POST',
                body: JSON.stringify(new_card_value),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .catch(error => {
                //handle error
                console.log(error)
            });

    })

})



dropable_place.forEach(dropable => {
    last_added = false
    dropable.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(dropable, e.clientY)

        const dragging = document.querySelector('.dragging')
        if (afterElement == null) {
            dropable.appendChild(dragging)
            last_added = true
        } else {
            dropable.insertBefore(dragging, afterElement)
        }

    })
})

function getDragAfterElement(dropable, y) {
    const draggableElements = [...dropable.querySelectorAll('#draggable_item:not(.dragging')]
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return {
                offset: offset,
                element: child
            }
        } else {
            return closest
        }
    }, {
        offset: Number.NEGATIVE_INFINITY
    }).element
}


var card_titlenewCard = document.querySelector('form#newCard')

newCard.addEventListener('submit', async (e) => {
    e.preventDefault();
    var card_title = newCard.card_title.value
    var card_body = newCard.card_body.value
    console.log(card_title, card_body)
    fetch('/new-card', {
            method: 'POST',
            body: JSON.stringify({
                card_title,
                card_body
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            //handle response            
            console.log(response);
        })
        .then(data => {
            //handle data
            console.log(data);
        })
        .catch(error => {
            //handle error
            console.log(error)
        });
})


var myModal = document.getElementById('exampleModal')
var myInput = document.getElementById('myInput')

exampleModal.addEventListener('shown.bs.modal', function() {
    myInput.focus()
})