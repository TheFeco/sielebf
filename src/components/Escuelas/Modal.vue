<template>
  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
    max-width="900px"
    full-width
  >
    <v-card>
      <v-card-title>Escuela</v-card-title>

      <v-card-text lass="px-2 pb-2">
        <v-form v-model="valid">
          <v-container class="py-0">
            <v-row>
              <v-col sm="6" cols="12">
                <Select 
                  v-model="form.id_materia"
                  placeholder="Municipio *"
                  :items="[{text: 'Uno', value: 1}, {text: 'Dos', value: 2}]"
                  required
                  :rules="rules.required"
                  icon="mdi-book-open-outline"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Select 
                  v-model="form.id_materia"
                  placeholder="Localidad *"
                  :items="[{text: 'Uno', value: 1}, {text: 'Dos', value: 2}]"
                  required
                  :rules="rules.required"
                  icon="mdi-book-open-outline"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Select 
                  v-model="form.id_materia"
                  placeholder="Nivel *"
                  :items="[{text: 'Uno', value: 1}, {text: 'Dos', value: 2}]"
                  required
                  :rules="rules.required"
                  icon="mdi-book-open-outline"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Field
                  placeholder="Modalidad *"
                  v-model="form.ctt"
                  required
                  :rules="rules.required"
                  icon="mdi-book-open-outline"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Field
                  placeholder="Sector *"
                  v-model="form.vc_nombre"
                  required
                  :rules="rules.required"
                  icon="mdi-text-short"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Field
                  placeholder="Zona *"
                  v-model="form.vc_nombre"
                  required
                  :rules="rules.required"
                  icon="mdi-text-short"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Field
                  placeholder="Contexto (rural, urbano) *"
                  v-model="form.vc_nombre"
                  required
                  :rules="rules.required"
                  icon="mdi-text-short"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <v-checkbox
                  v-model="form.turno"
                  label="Turno matutino"
                  color="primary"
                  hide-details
                />
              </v-col>

              <v-col sm="6" cols="12">
                <Field
                  placeholder="CTT *"
                  v-model="form.ctt"
                  required
                  :rules="rules.required"
                  icon="mdi-book-open-outline"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Field
                  placeholder="Nombre *"
                  v-model="form.vc_nombre"
                  required
                  :rules="rules.required"
                  icon="mdi-text-short"
                />
              </v-col>

              <v-col sm="12" cols="12">
                <Textarea
                  v-model="form.vc_descripcion"
                  placeholder="Domicilio"
                  icon="mdi-text"
                />
              </v-col>
            </v-row>

          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="blue darken-1" text @click="cancelar">Cancelar</v-btn>
        <v-btn :disabled="!valid" color="blue darken-1" text @click="aceptar"
          >Guardar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/* eslint-disable camelcase */
import { isEmpty, pick } from 'lodash'

const formFields = ['ctt']
export default {
  components:{
    Select: ()=> import('@/components/Form/Select'),
    Field: ()=> import('@/components/Form/Field'),
    Textarea: ()=> import('@/components/Form/Textarea')
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    data(value){
      this.form = pick(value, formFields)
    }
  },
  data() {
    return {
      valid: true,
      rules: {
        required: [(v) => !!v || 'Este campo es requerido'],
      },
      form: {}
    }
  },
  methods: {
    cancelar() {
      this.$emit('input', false)
    },
    aceptar() {
      const isCreate = isEmpty(this.data)

      try {
        const id = 1, 
        params = {}

        let escuela = null

        if(isCreate){
          escuela = this.$api.escuelas.store(id, params)
        }
        else {
          escuela = this.$api.escuelas.update(id, params)
        }

        console.log(escuela)
      }catch (error) {
        console.log(error)
      }
    },
  }
}
</script>
