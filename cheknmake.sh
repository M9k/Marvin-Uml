PLANT="java -jar ../bin/plantuml.jar"
rm -rf build/
mkdir -p build
ERROR=false
declare -a modules=("redux" "Solidity" "react" "web3function" "marvin")
for dr in "${modules[@]}";do
  cd $dr
  echo "==============$dr=============="
  OUT=$(cat index.puml | $PLANT -syntax)
  if [[ $OUT = *"ERROR"* ]] ; then
    ERROR=true
    echo "$OUT"
  else
    echo "OK"
    $PLANT index.puml -o ../build/$dr
  fi
  cd ..
done
printf "\n\n\n------------RESULT----------\n"
if $ERROR; then
  echo "ERRORED"
  exit 1
fi
echo "SUCCESS"
exit 0
