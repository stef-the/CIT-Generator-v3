<script>
	// @ts-nocheck
	import duplicates from '../../static/data/duplicates.json';

	export let out = { displayname: '' };
	export let out2 = {};
	export const exclusions = [];
	export const inputs = [
		{
			name: 'iname',
			title: 'Internal Name',
			placeholder: 'END_SWORD'
		},
		{
			name: 'txname',
			title: 'Texture Name',
			placeholder: 'texture.png',
			split: true // broken atm
		},
		{
			name: 'fname',
			title: 'File Name',
			placeholder: 'texture.properties'
		},
		{
			name: 'jname',
			title: 'JSON Name',
			placeholder: 'model.json'
		}
	];

	// Download file from browser
	function download(data, filename, type) {
		let file = new Blob([data], { type: type });
		if (window.navigator.msSaveOrOpenBlob) window.navigator.msSaveOrOpenBlob(file, filename);
		else {
			// Others
			let a = document.createElement('a'),
				url = URL.createObjectURL(file);
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			setTimeout(function () {
				document.body.removeChild(a);
				window.URL.revokeObjectURL(url);
			}, 0);
		}
	}

	// Remove minecraft formatting from string
	function displayRename(input) {
		let output = '';
		('§a' + input).split('§').forEach((part) => {
			output += part.substring(1);
		});
		return output;
	}

	// Get JSON from a URL
	async function getJSON(input) {
		const response = await fetch(input, {
			method: 'GET'
		});
		return response.json();
	}
</script>

<title>CIT Generator - Items</title>

<h1 class="box-inner">
	<a class="linkto" href="/">Item CIT Generator</a>
</h1>
<div class="linebreak" />
<form autocomplete="off">
	<div class="labelcontainer">
		{#each inputs as item}
			<div class="labelgroup" id="{item.name}container">
				<label for={item.name}>{item.title}</label>
				<div class="linebreak" />
				<input
					class="text"
					type="text"
					name={item.name}
					id={item.name}
					placeholder={item.placeholder}
				/><br />
			</div>
			{#if item.split}
				<div class="split" />
			{/if}
		{/each}
	</div>
	<div class="linebreak" />
	<div class="labelgroup submit">
		<input
			class="submit"
			type="button"
			name="submit"
			value="Submit"
			on:click={function submit() {
				if (document.getElementById('iname').value) {
					getJSON(
						`https://raw.githubusercontent.com/NotEnoughUpdates/NotEnoughUpdates-REPO/master/items/${
							document.getElementById('iname').value
						}.json`
					).then((result) => {
						out = result;
						let re;

						if (displayRename(result.displayname) in duplicates.data) {
							// if the item is excluded from standard CIT
							re = `type=item\nitems=${result.itemid}\nnbt.ExtraAttributes.id=${
								document.getElementById('iname').value
							}`;
						} else {
							// if the item is included in standard CIT
							re = `type=item\nitems=${result.itemid}\nnbt.display.Name=ipattern:*${
								document.getElementById('iname').value
							}*`;
						}
						if (document.getElementById('txname').value) {
							// if texture name is given
							re += `\ntexture=${document.getElementById('txname').value}`;
						}
						if (document.getElementById('jname').value) {
							// if json name is given
							re += `\nmodel=./${document.getElementById('jname').value}`;
						}

						out2 = {
							// output for file editor / download
							content: re,
							fname:
								document.getElementById('fname').value || document.getElementById('iname').value
						};

						console.log(out2);

						// unhide download button
						document.getElementById('downloadcontainer').classList.remove('hidden');
						document.getElementById('downloadbutton').classList.remove('hidden');
						document.getElementById('inamecontainer').classList.remove('required')
					});
				} else {
					document.getElementById('inamecontainer').classList.add('required')
				}
			}}
		/>
	</div>
	<div class="linebreak" />
	<div class="linebreak" />
	<div class="labelgroup submit hidden" id="downloadcontainer">
		<input
			class="submit hidden"
			id="downloadbutton"
			type="button"
			name="download"
			value="Download"
			on:click={() => {
				download(out2.content, out2.fname, 'text');
				window.location.reload(); // reload page
			}}
		/>
	</div>
</form>
<div id="alert"><div><span></span></div></div>