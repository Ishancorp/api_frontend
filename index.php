$my_env_var = getenv('API_KEY');

<script type="text/javascript">
   var php_var = "<?php echo $my_env_var; ?>";
</script>

<?php include_once("home.html"); ?>

