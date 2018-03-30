PLANT="java -jar ../bin/plantuml.jar"
rm -rf build/
mkdir -p build
ERROR=false
declare -a modules=("redux" "Solidity" "react" "web3function")
for dr in "${modules[@]}";do
  cd $dr
  OUT=$(cat index.puml | $PLANT -syntax)
  if [[ $OUT = *"ERROR"* ]] ; then
    ERROR=true
    echo "$OUT"
  else
    $PLANT index.puml -o ../build/$dr
  fi
  cd ..
done
if $ERROR; then
  echo "ERRORED"
  exit 1
fi
exit 0
