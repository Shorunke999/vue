<template>
    <div>
        <button @click='changestate' :class='button'>button</button>
    <section>
        <h2>Assignment</h2>
        <ul>
           <li v-for ='assignment in assignments' :key="assignment.subject">
                <label for="">
                    {{ assignment.subject }}
                    <input type="checkbox" v-model ='assignment.status'/>
                </label>
            </li>
        </ul>
    </section>
    <section>
        <h2>completed</h2>
        <ul>
           <li v-for ='assignment in assignments' :key="assignment.subject">
            <div v-if ='assignment.status'>
                <label>
                    {{ assignment.subject }} is completed
                </label>
            </div>
            </li>
        </ul>
    </section>
    </div>
</template>
<script>
export default{
    data(){
        return{
             button:false,
             assignments:[
                {subject:'mathematics', status:false},
                {subject:'english', status:false},
                {subject:'physics', status:false},
             ]
        };
    },
    methods: {
        changestate(){
            this.button='button';
        }
    },
}
</script>
<style>
.button{
    background-color: red;
    width: 30px;
    height: 30px;
}
</style>
