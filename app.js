// Simple client-side user management with localStorage
const STORAGE_KEY = 'um_users_v1'

const $ = id => document.getElementById(id)
let users = []

function load(){
  try{ users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] }catch(e){ users = [] }
}

function save(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,7) }

function render(filter=''){
  const tbody = document.querySelector('#users-table tbody')
  tbody.innerHTML = ''
  const q = filter.trim().toLowerCase()
  users.filter(u=>{
    if(!q) return true
    return (u.name+u.email+u.role).toLowerCase().includes(q)
  }).forEach(u=>{
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td>${escapeHtml(u.name)}</td>
      <td>${escapeHtml(u.email)}</td>
      <td>${escapeHtml(u.role||'')}</td>
      <td>
        <button data-id="${u.id}" class="edit">Edit</button>
        <button data-id="${u.id}" class="delete secondary">Delete</button>
      </td>`
    tbody.appendChild(tr)
  })
}

function escapeHtml(s){ return (s+'').replace(/[&<>"']/g, c=>({
  '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"
})[c])}

function addUser(data){
  users.push({ id: uid(), ...data })
  save(); render($('search').value)
}

function updateUser(id, data){
  const i = users.findIndex(x=>x.id===id)
  if(i>-1){ users[i] = { ...users[i], ...data } }
  save(); render($('search').value)
}

function removeUser(id){
  users = users.filter(x=>x.id!==id)
  save(); render($('search').value)
}

function resetForm(){
  $('user-id').value=''
  $('name').value=''
  $('email').value=''
  $('role').value=''
  $('form-title').textContent='Add User'
  $('save-btn').textContent='Save'
}

function fillForm(user){
  $('user-id').value = user.id
  $('name').value = user.name
  $('email').value = user.email
  $('role').value = user.role
  $('form-title').textContent='Edit User'
  $('save-btn').textContent='Update'
}

document.addEventListener('DOMContentLoaded', ()=>{
  load()
  if(users.length===0){
    // seed sample data
    users = [
      { id: uid(), name:'Alice Johnson', email:'alice@example.com', role:'Admin' },
      { id: uid(), name:'Bob Lee', email:'bob@example.com', role:'User' }
    ]
    save()
  }
  render()

  $('user-form').addEventListener('submit', e=>{
    e.preventDefault()
    const id = $('user-id').value
    const data = { name:$('name').value.trim(), email:$('email').value.trim(), role:$('role').value.trim() }
    if(!data.name || !data.email) return alert('Name and email required')
    if(id) updateUser(id, data)
    else addUser(data)
    resetForm()
  })

  document.querySelector('#users-table tbody').addEventListener('click', e=>{
    const id = e.target.dataset.id
    if(!id) return
    if(e.target.classList.contains('edit')){
      const u = users.find(x=>x.id===id)
      if(u) fillForm(u)
    } else if(e.target.classList.contains('delete')){
      if(confirm('Delete this user?')) removeUser(id)
    }
  })

  $('cancel-btn').addEventListener('click', ()=>resetForm())
  $('search').addEventListener('input', e=>render(e.target.value))
  $('clear-storage').addEventListener('click', ()=>{
    if(confirm('Remove ALL users and reset sample data?')){
      localStorage.removeItem(STORAGE_KEY); load(); location.reload()
    }
  })
})
