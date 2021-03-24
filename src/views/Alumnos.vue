<template>
  <v-container>
    <v-card>
      <v-card-title>
        Alumos
        <v-spacer></v-spacer>
        <v-btn @click="agregar">Agregar</v-btn>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :items-per-page="5"
      >
        <template v-slot:item.actions="{item}">
          <IconButton icon="mdi-pencil" @click="editar(item)"/>
          <IconButton icon="mdi-delete" @click="eliminar(item)"/>
        </template>
      </v-data-table>
  </v-card>

  <Confirm
    v-model="open"
    descripcion="Seguro de querer eliminar el registro"
    @aceptar="aceptar"
  />

  <Modal v-model="formulario.open" :data="formulario.data"/>
  </v-container>
</template>

<script>
  export default {
    components: {
      IconButton: () => import('@/components/Common/IconButton'),
      Confirm: () => import('@/components/Common/Confirm'),
      Modal: () => import('@/components/Alumnos/Modal'),
    },
    async created(){

      try{
        const data = await this.$api.alumnos.index()

        this.data = data
      }catch(err){
        console.log(err)
      }
    },
    data () {
      return {
        search: '',
        item: null,
        open: false,

        formulario: {
          open: false, 
          data: {}
        },

        headers: [
          { text: 'CURP', value: 'curp' },
          {
            text: 'Nombre',
            align: 'start',
            sortable: false,
            value: 'nombre',
          },
          {
            text: 'Genero',
            align: 'start',
            sortable: false,
            value: 'genero',
          },
          { text: '', value: 'actions', sortable: false, width: '100px' },
        ],
        data: [],
      }
    },
    computed: {
      items(){
        return this.data.map(v => ({
          id: v.id,
          curp: v.curp.toUpperCase(),
          nombre: `${v.nombre} ${v.primer_apellido} ${v.segundo_apellido}`.trim(),
          genero: v.genero === 1 ? 'Masculino': 'Femenino'
        }))
      }
    },
    methods: {
      agregar(){
        this.formulario = {
          open: true,
          data: {},
        }
      },
      editar(data){
        const row = this.data.find(v => v.id === data.id)

        this.formulario = {
          open: true,
          data: row,
        }
      },
      eliminar(data){ 
        this.item = data
        this.open = true
      },
      aceptar(){
        this.item = null
        this.open = false
      }
    }
  }
</script>