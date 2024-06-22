new Vue({
  el: '#app',
  data: {
    fields: [
      { name: 'Field 1', value: 'Value 1', inline: true },
      { name: 'Field 2', value: 'Value 2', inline: true },
    ],
    embed: {
      title: 'Discord Embed Creator',
      description: 'Discord Embed Creator is a tool that allows users to create custom embeds for Discord. Embeds are used to enhance the visual presentation of messages in Discord by adding colors, fields, images, and other styling elements. With an Embed Creator, you can easily customize the title, description, color, and other settings of an embed without delving into the details of coding the JSON structure typically required for creating embeds in Discord.', 
      author: 'About us',
      imageURL: 'https://cdn.glitch.global/de93c334-a8c2-4333-808c-da266614e993/PREVIEw.jpg?v=1718899614471',
      thumbnailURL: 'https://cdn.glitch.global/de93c334-a8c2-4333-808c-da266614e993/p.jpg?v=1718899691631', 
      color: '#d2d2d2',
    },
    webhookUrl: '',
    field: {
      inline: false
    }
  },
  methods: {
    toggleCheckbox(index) {
      this.fields[index].inline = !this.fields[index].inline;
    },
    toggleInline: function(index) {
      this.fields[index].inline = !this.fields[index].inline;
    },
    addField() {
      this.fields.push({ name: '', value: '', inline: false });
    },
    removeField(index) {
      this.fields.splice(index, 1);
    },
    clearFields() {
      this.embed.title = '';
      this.embed.description = '';
      this.embed.author = '';
      this.embed.imageURL = '';
      this.embed.thumbnailURL = '';
      this.embed.color = '#000000'; 
      this.fields = [];
    },
    showModal(message) {
      const modal = document.getElementById('myModal');
      const modalText = document.getElementById('modalText');
      modalText.textContent = message;
      modal.style.display = 'block';
    },
    postWebhook() {
      if (!this.webhookUrl) {
        this.showModal('Please provide a webhook URL.'); // Замена alert
        return;
      }
      const payload = {
        embeds: [
          {
            title: this.embed.title,
            description: this.embed.description,
            author: { name: this.embed.author },
            image: { url: this.embed.imageURL },
            thumbnail: { url: this.embed.thumbnailURL },
            color: parseInt(this.embed.color.replace('#', ''), 16),
            fields: this.fields.map(field => ({
              name: field.name,
              value: field.value,
              inline: field.inline,
            })),
          }
        ]
      };

      fetch(this.webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to post to webhook.');
          }
          this.showModal('Embed successfully posted to the webhook.');
        })
        .catch(error => {
          console.error(error);
          this.showModal('Error posting embed to the webhook.');
        });
      },
    updateBorderColor() {
      const element = document.querySelector('.element');
      element.style.borderLeftColor = this.embed.color;
    }
  },
  watch: {
    'embed.color': function(newVal, oldVal) {
      this.updateBorderColor();
    }
  },
  mounted() {
    this.updateBorderColor();
  }
});

document.addEventListener('DOMContentLoaded', (event) => {
  var modal = document.getElementById('myModal');
  var span = document.getElementsByClassName('close')[0];

  span.onclick = function() {
    modal.style.display = 'none';
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
});
