<template>
  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
    max-width="800px"
    full-width
  >
    <v-card>
      <v-card-title>Alumno</v-card-title>

      <v-card-text lass="px-2 pb-2">
        <v-form v-model="valid">
          <v-container class="py-0">
            <v-row>
              <v-col cols="12">
                <Field
                  placeholder="CURP *"
                  v-model="form.ctt"
                  required
                  :rules="rules.required"
                  icon="mdi-badge-account-horizontal-outline"
                  autofocus
                />
              </v-col>
              <v-col cols="12">
                <Field
                  placeholder="Nombre *"
                  v-model="form.ctt"
                  required
                  :rules="rules.required"
                  icon="mdi-text-short"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Field
                  placeholder="Primer apellido *"
                  v-model="form.ctt"
                  required
                  :rules="rules.required"
                  icon="mdi-text-short"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Field
                  placeholder="Segundo apellido *"
                  v-model="form.ctt"
                  required
                  :rules="rules.required"
                  icon="mdi-text-short"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <v-radio-group v-model="form.sexo" row>
                  <v-radio
                    class="mr-4"
                    label="Masculino"
                    color="primary"
                    hide-details
                    :value="1"
                  />
                  <v-radio
                    label="Femenino"
                    color="primary"
                    hide-details
                    :value="2"
                  />
                </v-radio-group>
              </v-col>
              
            </v-row>

            <v-row>
              <v-col sm="6" cols="12">
                <Field
                  placeholder="Grupo *"
                  v-model="form.ctt"
                  required
                  :rules="rules.required"
                  icon="mdi-home-outline"
                />
              </v-col>
              <v-col sm="6" cols="12">
                <Select 
                  v-model="form.grado"
                  placeholder="Grado *"
                  :items="[{text: 'Primaria', value: 1}, {text: 'Secundaria', value: 2}]"
                  required
                  :rules="rules.required"
                  icon="mdi-format-list-numbered"
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
    // Textarea: ()=> import('@/components/Form/Textarea')
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
      form: {
        sexo: 1,
        grado: 1,
        turno: true,
      }
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
